import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("❌ Failed to upload file");

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText("❌ Failed to convert PDF");

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("❌ Failed to upload image");

    setStatusText("Preparing resume data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing your resume...");
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );

    if (!feedback) return setStatusText("❌ Failed to analyze resume");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("✅ Analysis complete! Redirecting...");
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#ffffff]">

      <Navbar />

      <section className="flex justify-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 relative">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Smart Feedback for Your Dream Job
          </h1>

          {isProcessing ? (
            <div className="text-center space-y-4">
              <h2 className="text-lg text-gray-600 font-medium animate-pulse">{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt="Processing..."
                className="w-2/3 mx-auto"
              />
            </div>
          ) : (
            <>
              <h2 className="text-center text-gray-500">
                Upload your resume and get real-time improvement feedback
              </h2>

              <form
                id="upload-form"
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="company-name" className="form-label">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company-name"
                      id="company-name"
                      placeholder="e.g. Google"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="job-title" className="form-label">
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="job-title"
                      id="job-title"
                      placeholder="e.g. Frontend Developer"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="job-description" className="form-label">
                      Job Description
                    </label>
                    <textarea
                      name="job-description"
                      id="job-description"
                      rows={5}
                      placeholder="Paste job description here..."
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="uploader" className="form-label">
                      Upload Resume (PDF)
                    </label>
                    <FileUploader onFileSelect={handleFileSelect} />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Analyze Resume
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
