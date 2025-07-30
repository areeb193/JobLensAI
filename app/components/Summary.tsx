import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-600'
            : score > 49
        ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className="w-full flex flex-col items-center justify-center mb-2">
            <div className="flex flex-row items-center justify-between w-full bg-white/60 backdrop-blur-md rounded-xl shadow p-4">
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-lg font-medium text-[var(--color-dark)]">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-lg font-bold {textColor}">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg w-full p-6 mb-6">
            <div className="flex flex-row items-center p-2 gap-8 mb-4">
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-[var(--color-primary)]">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
            <Category title="Content" score={feedback.content.score} />
            <Category title="Structure" score={feedback.structure.score} />
            <Category title="Skills" score={feedback.skills.score} />
        </div>
    )
}
export default Summary
