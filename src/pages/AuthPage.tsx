import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase, supabaseConfigMessage } from "../lib/supabase";
import { useAuth } from "../lib/AuthContext";
import { hoverCard } from "../lib/motion";

type AuthMode = "signin" | "signup" | "phone";

const PHONE_ACCOUNT_DOMAIN = "phone.ekokintsugi.local";
const PHONE_PASSWORD_SALT = "ekokintsugi-quick-signup";

function normalizePhoneDigits(rawPhone: string) {
  return rawPhone.replace(/\D/g, "").slice(-10);
}

function isValidPhoneDigits(digits: string) {
  return /^[6-9]\d{9}$/.test(digits);
}

function phoneToPseudoEmail(digits: string) {
  return `91${digits}@${PHONE_ACCOUNT_DOMAIN}`;
}

function phoneToPassword(digits: string) {
  return `${PHONE_PASSWORD_SALT}-${digits}`;
}

function isMissingProfilesTableError(error: { code?: string; message?: string } | null | undefined) {
  if (!error) return false;
  return (
    error.code === "PGRST205" ||
    error.code === "42P01" ||
    error.message?.includes("public.profiles") === true ||
    error.message?.includes("schema cache") === true
  );
}

function getFriendlyAuthMessage(error: { code?: string; message?: string } | null | undefined, mode: AuthMode) {
  const rawMessage = error?.message?.toLowerCase() ?? "";

  if (rawMessage.includes("email rate limit exceeded")) {
    return mode === "signup"
      ? "Too many confirmation emails were requested in a short time. Your account may already exist, so try Sign In, or wait about a minute before creating the account again."
      : "Too many email requests were sent in a short time. Wait about a minute and try again.";
  }

  if (rawMessage.includes("user already registered")) {
    return "This email is already registered. Switch to Sign In and continue with your existing account.";
  }

  if (rawMessage.includes("email not confirmed")) {
    return "Your account exists, but the email address is not confirmed yet. Open the confirmation email, then sign in.";
  }

  if (rawMessage.includes("invalid login credentials")) {
    return "That email or password does not match an existing account.";
  }

  if (rawMessage.includes("password should be at least")) {
    return "Choose a password with at least 6 characters.";
  }

  return error?.message || "Authentication failed. Please try again.";
}

function isSignupRetryableIssue(error: { message?: string } | null | undefined) {
  const rawMessage = error?.message?.toLowerCase() ?? "";
  return rawMessage.includes("email rate limit exceeded") || rawMessage.includes("user already registered");
}

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const rawInitialMode = searchParams.get("mode");
  const initialMode: AuthMode = rawInitialMode === "signup" || rawInitialMode === "phone" ? rawInitialMode : "signin";
  const nextDestination = searchParams.get("next");
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneName, setPhoneName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [showSignInHint, setShowSignInHint] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const nextMode = searchParams.get("mode");
    setMode(nextMode === "signup" || nextMode === "phone" ? nextMode : "signin");
  }, [searchParams]);

  useEffect(() => {
    if (isLoading || !user) return;
    navigate(nextDestination === "impact" ? "/?impact=open" : "/", { replace: true });
  }, [isLoading, navigate, nextDestination, user]);

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("mode", nextMode);
    setSearchParams(nextParams);
    setError("");
    setStatus("");
    setShowSignInHint(false);
  };

  const syncProfile = async (userId: string, fullName: string, userEmail: string, phone?: string) => {
    const { data: existingProfile, error: existingProfileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (existingProfileError) {
      if (isMissingProfilesTableError(existingProfileError)) {
        return;
      }
      throw existingProfileError;
    }

    const baseRecord: Record<string, unknown> = { id: userId, name: fullName, email: userEmail };
    const recordWithPhone = phone ? { ...baseRecord, phone } : baseRecord;

    if (!existingProfile) {
      const { error: insertProfileError } = await supabase.from("profiles").insert(recordWithPhone);

      if (insertProfileError) {
        if (phone && insertProfileError.message?.toLowerCase().includes("phone")) {
          const { error: retryError } = await supabase.from("profiles").insert(baseRecord);
          if (retryError && !isMissingProfilesTableError(retryError) && !retryError.message.toLowerCase().includes("duplicate")) {
            throw retryError;
          }
          return;
        }

        if (!isMissingProfilesTableError(insertProfileError) && !insertProfileError.message.toLowerCase().includes("duplicate")) {
          throw insertProfileError;
        }
      }
    } else if (phone) {
      const { error: updateProfileError } = await supabase.from("profiles").update({ phone }).eq("id", userId);
      if (updateProfileError && !updateProfileError.message?.toLowerCase().includes("phone")) {
        throw updateProfileError;
      }
    }
  };

  const completeSignedInFlow = () => {
    navigate(nextDestination === "impact" ? "/?impact=open" : "/", { replace: true });
  };

  const tryImmediateSignIn = async (normalizedEmail: string, rawPassword: string) => {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: rawPassword
    });

    if (signInError) {
      throw signInError;
    }

    completeSignedInFlow();
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setStatus("");
    setShowSignInHint(false);
    setIsSubmitting(true);

    if (!supabase) {
      setError(supabaseConfigMessage);
      setIsSubmitting(false);
      return;
    }

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (mode === "signup") {
        if (!trimmedName) {
          throw new Error("Please enter your full name.");
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: { name: trimmedName },
            emailRedirectTo: window.location.origin
          }
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          await syncProfile(data.user.id, trimmedName, normalizedEmail);
        }

        if (data.session) {
          completeSignedInFlow();
        } else {
          setStatus("Account created. Check your email to confirm your sign in.");
        }
      } else {
        await tryImmediateSignIn(normalizedEmail, password);
      }
    } catch (authError: any) {
      if (mode === "signup" && isSignupRetryableIssue(authError)) {
        try {
          await tryImmediateSignIn(normalizedEmail, password);
          return;
        } catch (signInAfterSignupError: any) {
          const signInMessage = signInAfterSignupError?.message?.toLowerCase() ?? "";

          if (signInMessage.includes("email not confirmed")) {
            setError("Your account was created, but Supabase still requires email confirmation before sign-in. Open the confirmation email, or disable Confirm Email in your Supabase Auth settings for local testing.");
            setShowSignInHint(true);
            return;
          }
        }
      }

      const friendlyMessage = getFriendlyAuthMessage(authError, mode);
      setError(friendlyMessage);
      setShowSignInHint(
        mode === "signup" && isSignupRetryableIssue(authError)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setStatus("");
    setShowSignInHint(false);
    setIsSubmitting(true);

    if (!supabase) {
      setError(supabaseConfigMessage);
      setIsSubmitting(false);
      return;
    }

    const trimmedName = phoneName.trim();
    const digits = normalizePhoneDigits(phone);

    try {
      if (!trimmedName) {
        throw new Error("Please enter your name.");
      }
      if (!isValidPhoneDigits(digits)) {
        throw new Error("Enter a valid 10-digit mobile number.");
      }

      const pseudoEmail = phoneToPseudoEmail(digits);
      const derivedPassword = phoneToPassword(digits);

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: pseudoEmail,
        password: derivedPassword,
        options: {
          data: { name: trimmedName, phone: digits, signup_method: "phone" }
        }
      });

      if (signUpError) {
        const rawMessage = signUpError.message?.toLowerCase() ?? "";
        if (rawMessage.includes("user already registered")) {
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: pseudoEmail,
            password: derivedPassword
          });
          if (signInError) throw signInError;

          if (signInData.user) {
            await syncProfile(signInData.user.id, trimmedName, pseudoEmail, digits);
          }
          completeSignedInFlow();
          return;
        }
        throw signUpError;
      }

      if (data.user) {
        await syncProfile(data.user.id, trimmedName, pseudoEmail, digits);
      }

      if (data.session) {
        completeSignedInFlow();
      } else {
        try {
          await tryImmediateSignIn(pseudoEmail, derivedPassword);
        } catch {
          setError("Your account was created, but this project still requires email confirmation. Turn off 'Confirm Email' in Supabase Auth settings so phone-only signups can sign in instantly.");
        }
      }
    } catch (authError: any) {
      setError(authError?.message || "Could not sign up with that number. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,87,34,0.1),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,87,34,0.05),transparent_30%)]" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-stretch relative z-10 text-left">
          
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel border-glow-orange/20 hover:border-glow-orange/40 transition-all rounded-[3rem] p-8 sm:p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-glow-orange/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
            <div className="relative z-10 h-full flex flex-col justify-between gap-10 sm:gap-16">
              <div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-glow-orange font-bold mb-4 sm:mb-6">
                  Member Impact
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-tight md:leading-none mb-6 sm:mb-8">
                  Your Circular Journey, Verified.
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground italic max-w-xl leading-relaxed">
                  Sign in to connect your personal dashboard with carbon savings, reclaimed waste, tree support, and carbon wallet activity.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Personal impact records",
                  "Tree tracking",
                  "Carbon wallet history",
                  "Verified certificates"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                    <CheckCircle2 className="w-5 h-5 text-glow-orange shrink-0" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/80 font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-[3rem] p-8 sm:p-12"
          >
            <div className="flex flex-wrap items-center gap-3 mb-10 rounded-2xl bg-white/5 border border-white/10 p-2">
              <button
                type="button"
                onClick={() => switchMode("signin")}
                className={`flex-1 min-w-[30%] rounded-xl px-4 py-3 font-mono text-[10px] uppercase tracking-widest font-black transition-all cursor-pointer ${
                  mode === "signin" ? "bg-gradient-glow text-white shadow-lg" : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={`flex-1 min-w-[30%] rounded-xl px-4 py-3 font-mono text-[10px] uppercase tracking-widest font-black transition-all cursor-pointer ${
                  mode === "signup" ? "bg-gradient-glow text-white shadow-lg" : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => switchMode("phone")}
                className={`flex-1 min-w-[30%] rounded-xl px-4 py-3 font-mono text-[10px] uppercase tracking-widest font-black transition-all cursor-pointer ${
                  mode === "phone" ? "bg-gradient-glow text-white shadow-lg" : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                Quick Signup
              </button>
            </div>

            <div className="mb-10 text-left">
              <p className="text-[10px] font-mono tracking-widest uppercase text-glow-orange font-bold mb-4">
                {mode === "signin" ? "Welcome Back" : mode === "phone" ? "Quick Signup" : "Create Account"}
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
                {mode === "signin"
                  ? "Access your impact hub"
                  : mode === "phone"
                    ? "Sign up with your number"
                    : "Start your verified profile"}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground italic leading-relaxed">
                {mode === "signin"
                  ? "Demo data stays visible for visitors. Your real dashboard appears after sign in."
                  : mode === "phone"
                    ? "Just your name and number - no OTP, no password. Start shopping right away."
                    : "Your account is stored securely and linked to your ecological profile record."}
              </p>
              {!supabase && (
                <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-200">
                  {supabaseConfigMessage}
                </div>
              )}
              {nextDestination === "impact" && (
                <div className="mt-5 rounded-2xl border border-glow-orange/30 bg-glow-orange/10 px-5 py-4 text-sm text-glow-orange">
                  You&apos;ll return to the Impact Dashboard right after authentication.
                </div>
              )}
            </div>

            {mode === "phone" ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <label className="block">
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/70 font-bold mb-3 text-left">Your Name</span>
                  <div className="relative">
                    <UserRound className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-glow-orange" />
                    <input
                      required
                      value={phoneName}
                      onChange={(event) => setPhoneName(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white outline-none transition-all focus:border-glow-orange focus:ring-1 focus:ring-glow-orange placeholder:text-white/30"
                      placeholder="Your name"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/70 font-bold mb-3 text-left">Mobile Number</span>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-glow-orange" />
                    <input
                      required
                      type="tel"
                      inputMode="numeric"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white outline-none transition-all focus:border-glow-orange focus:ring-1 focus:ring-glow-orange placeholder:text-white/30"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </label>

                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-medium text-red-200 text-left">
                    <p>{error}</p>
                  </div>
                )}

                {status && (
                  <div className="rounded-xl border border-glow-orange/30 bg-glow-orange/10 px-5 py-4 text-sm font-medium text-glow-orange text-left">
                    {status}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading || !supabase}
                  className="w-full rounded-2xl bg-gradient-glow px-8 py-5 text-white font-mono text-[12px] uppercase tracking-widest font-black hover:shadow-[0_0_30px_rgba(255,87,34,0.4)] transition-all disabled:opacity-60 flex items-center justify-center gap-3 cursor-pointer group"
                >
                  {isSubmitting || isLoading ? "Processing" : "Start Shopping"}
                  <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-2 transition-transform duration-300" />
                </button>

                <p className="text-xs text-muted-foreground italic leading-relaxed text-left">
                  No password to remember - just enter the same number next time to get back into your account.
                </p>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {mode === "signup" && (
                  <label className="block">
                    <span className="block text-[10px] font-mono tracking-widest uppercase text-white/70 font-bold mb-3 text-left">Full Name</span>
                    <div className="relative">
                      <UserRound className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-glow-orange" />
                      <input
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white outline-none transition-all focus:border-glow-orange focus:ring-1 focus:ring-glow-orange placeholder:text-white/30"
                        placeholder="Your name"
                      />
                    </div>
                  </label>
                )}

                <label className="block">
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/70 font-bold mb-3 text-left">Email Address</span>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-glow-orange" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white outline-none transition-all focus:border-glow-orange focus:ring-1 focus:ring-glow-orange placeholder:text-white/30"
                      placeholder="example@email.com"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="block text-[10px] font-mono tracking-widest uppercase text-white/70 font-bold mb-3 text-left">Password</span>
                  <div className="relative">
                    <LockKeyhole className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-glow-orange" />
                    <input
                      required
                      minLength={6}
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-14 py-4 text-white outline-none transition-all focus:border-glow-orange focus:ring-1 focus:ring-glow-orange placeholder:text-white/30"
                      placeholder="Minimum 6 characters"
                    />
                  </div>
                </label>

                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm font-medium text-red-200 text-left">
                    <p>{error}</p>
                    {showSignInHint && (
                      <button
                        type="button"
                        onClick={() => switchMode("signin")}
                        className="mt-4 inline-flex rounded-lg border border-red-500/50 bg-red-500/20 px-4 py-2 text-[10px] font-mono uppercase tracking-widest font-bold text-red-200 transition-colors hover:bg-red-500/30 cursor-pointer"
                      >
                        Switch To Sign In
                      </button>
                    )}
                  </div>
                )}

                {status && (
                  <div className="rounded-xl border border-glow-orange/30 bg-glow-orange/10 px-5 py-4 text-sm font-medium text-glow-orange text-left">
                    {status}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading || !supabase}
                  className="w-full rounded-2xl bg-gradient-glow px-8 py-5 text-white font-mono text-[12px] uppercase tracking-widest font-black hover:shadow-[0_0_30px_rgba(255,87,34,0.4)] transition-all disabled:opacity-60 flex items-center justify-center gap-3 cursor-pointer group"
                >
                  {isSubmitting || isLoading ? "Processing" : mode === "signin" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </form>
            )}

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <Link to="/" className="font-mono text-[10px] uppercase tracking-widest font-bold hover:text-glow-orange transition-colors">
                Continue as visitor
              </Link>
              {mode !== "phone" && (
                <button
                  type="button"
                  onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
                  className="font-mono text-[10px] uppercase tracking-widest font-bold text-glow-orange hover:text-white transition-colors cursor-pointer"
                >
                  {mode === "signin" ? "Need an account?" : "Already registered?"}
                </button>
              )}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
