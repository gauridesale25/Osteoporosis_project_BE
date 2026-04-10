import ChartComponent from "./ChartComponent";

export default function ResultCard({ result }) {
  return (
    <div className="mt-6 p-4 border rounded shadow">
      <h2 className="text-xl font-bold">{result.prediction}</h2>
      <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>

      <ChartComponent data={result.all_probs} />
    </div>
  );
}