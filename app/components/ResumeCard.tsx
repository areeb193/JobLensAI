import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        <Link to={`/resume/${id}`} className="block w-[320px] bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl group min-h-[260px] mx-auto">
            <div className="flex flex-row gap-3 justify-between items-center mb-2">
                <div className="flex flex-col gap-0.5">
                    {companyName && <h2 className="text-base font-semibold text-[var(--color-dark)] truncate max-w-[160px]">{companyName}</h2>}
                    {jobTitle && <h3 className="text-xs text-[var(--color-primary)] font-medium truncate max-w-[160px]">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="text-base font-semibold text-[var(--color-dark)]">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>
            {resumeUrl && (
                <div className="w-full h-[90px] flex items-center justify-center bg-[var(--color-bg)] rounded-xl overflow-hidden mb-2">
                    <img
                        src={resumeUrl}
                        alt="resume"
                        className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            )}
        </Link>
    )
}
export default ResumeCard
