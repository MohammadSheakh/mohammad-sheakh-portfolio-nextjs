"use client";

import { FormEvent, useState } from "react";

const FEEDBACK_STATUSES = ["General", "Wish", "Important", "Suggestion"] as const;

const DETAIL_FIELDS = [
  {
    name: "facebookId",
    label: "Facebook ID",
    placeholder: "Paste your Facebook profile link",
    type: "url",
  },
  {
    name: "phoneNumber",
    label: "Phone number",
    placeholder: "Include your country code",
    type: "tel",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Type your email address",
    type: "email",
  },
  {
    name: "presentAddress",
    label: "Present address",
    placeholder: "Your present address",
    type: "text",
  },
  {
    name: "permanentAddress",
    label: "Permanent address",
    placeholder: "Your permanent address",
    type: "text",
  },
  {
    name: "reference",
    label: "Reference",
    placeholder: "How do I know you?",
    type: "text",
  },
] as const;

type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number];
type SubmitState = "idle" | "submitting" | "success" | "preview" | "error";

interface FeedbackFormData {
  name: string;
  feedback: string;
  facebookId: string;
  phoneNumber: string;
  email: string;
  presentAddress: string;
  permanentAddress: string;
  reference: string;
  statuses: FeedbackStatus[];
}

const INITIAL_FORM: FeedbackFormData = {
  name: "",
  feedback: "",
  facebookId: "",
  phoneNumber: "",
  email: "",
  presentAddress: "",
  permanentAddress: "",
  reference: "",
  statuses: [],
};

const inputClassName =
  "w-full rounded-lg border border-slate-500/70 bg-slate-700 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 transition-colors focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20";

export default function Feedback() {
  const [anonymous, setAnonymous] = useState(false);
  const [moreInformation, setMoreInformation] = useState(false);
  const [formData, setFormData] = useState<FeedbackFormData>(INITIAL_FORM);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const updateField = (
    field: keyof Omit<FeedbackFormData, "statuses">,
    value: string,
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const toggleStatus = (status: FeedbackStatus) => {
    setFormData((current) => ({
      ...current,
      statuses: current.statuses.includes(status)
        ? current.statuses.filter((item) => item !== status)
        : [...current.statuses, status],
    }));
  };

  // Anonymous and extended-information modes are intentionally mutually exclusive.
  const handleAnonymousChange = (checked: boolean) => {
    setAnonymous(checked);
    if (checked) setMoreInformation(false);
  };

  const handleMoreInformationChange = (checked: boolean) => {
    setMoreInformation(checked);
    if (checked) setAnonymous(false);
  };

  // Normalize optional identity fields before posting to the future feedback API.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");
    setMessage("");

    const payload = {
      anonymous,
      name: anonymous ? null : formData.name.trim() || null,
      feedback: formData.feedback.trim(),
      statuses: formData.statuses,
      facebookId: anonymous ? null : formData.facebookId.trim() || null,
      phoneNumber: anonymous ? null : formData.phoneNumber.trim() || null,
      email: anonymous ? null : formData.email.trim() || null,
      presentAddress: anonymous ? null : formData.presentAddress.trim() || null,
      permanentAddress: anonymous
        ? null
        : formData.permanentAddress.trim() || null,
      reference: anonymous ? null : formData.reference.trim() || null,
    };

    const feedbackApiUrl = process.env.NEXT_PUBLIC_FEEDBACK_API_URL;

    if (!feedbackApiUrl) {
      setSubmitState("preview");
      setMessage("The form is ready. Connect the NestJS endpoint to enable posting.");
      return;
    }

    try {
      const response = await fetch(feedbackApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Unable to submit feedback");

      setFormData(INITIAL_FORM);
      setAnonymous(false);
      setMoreInformation(false);
      setSubmitState("success");
      setMessage("Thank you. Your feedback was submitted successfully.");
    } catch {
      setSubmitState("error");
      setMessage("Feedback could not be submitted. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-PrimaryColorDark px-6 py-20 text-slate-200 md:px-12 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-3 text-center text-[0.68rem] font-semibold uppercase tracking-[3px] text-cyan-300">
          Feedback
        </div>
        <h2 className="mb-8 text-center font-display text-[clamp(2rem,4vw,3.4rem)] font-black leading-tight tracking-[-1.5px] text-white">
          Share your thoughts and creative ideas with me
        </h2>

        {/* Feedback identity mode controls which optional fields are displayed. */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10">
            <input
              className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-PrimaryColorDark"
              type="checkbox"
              checked={anonymous}
              onChange={(event) => handleAnonymousChange(event.target.checked)}
            />
            Act as anonymous
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10">
            <input
              className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-PrimaryColorDark"
              type="checkbox"
              checked={moreInformation}
              onChange={(event) =>
                handleMoreInformationChange(event.target.checked)
              }
            />
            Give more information
          </label>
        </div>

        <form
          className="rounded-2xl border-2 border-slate-200/90 bg-black/5 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] md:p-8"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            {!anonymous && (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-sky-200">
                  Your name
                </span>
                <input
                  className={inputClassName}
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Type your name here"
                  required
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </label>
            )}

            {!anonymous && moreInformation &&
              DETAIL_FIELDS.map((field) => (
                <label className="block" key={field.name}>
                  <span className="mb-2 block text-sm font-medium text-sky-200">
                    {field.label}
                  </span>
                  <input
                    className={inputClassName}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    placeholder={field.placeholder}
                    onChange={(event) =>
                      updateField(field.name, event.target.value)
                    }
                  />
                </label>
              ))}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-sky-200">
                Your feedback
              </span>
              <textarea
                className={`${inputClassName} min-h-[130px] resize-y`}
                name="feedback"
                value={formData.feedback}
                placeholder="Write your feedback here"
                required
                onChange={(event) =>
                  updateField("feedback", event.target.value)
                }
              />
            </label>

            <fieldset className="rounded-xl border border-slate-200/90 p-4">
              <legend className="px-2 text-sm font-semibold text-white">
                Status
              </legend>
              <div className="flex flex-wrap gap-x-5 gap-y-3">
                {FEEDBACK_STATUSES.map((status) => (
                  <label
                    className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-200"
                    key={status}
                  >
                    <input
                      className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-PrimaryColorDark"
                      type="checkbox"
                      checked={formData.statuses.includes(status)}
                      onChange={() => toggleStatus(status)}
                    />
                    {status}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <p
              className={`max-w-lg text-sm ${
                submitState === "error" ? "text-red-300" : "text-slate-300"
              }`}
              aria-live="polite"
            >
              {message}
            </p>
            <button
              className="ml-auto inline-flex min-w-24 items-center justify-center rounded-lg border-2 border-slate-200 bg-white/10 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-white hover:text-PrimaryColorDark disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={submitState === "submitting"}
            >
              {submitState === "submitting" ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
