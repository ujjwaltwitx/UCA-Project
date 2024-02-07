export default function SubjectList({ subs }) {
  const sub = {
    Maths: "#64CCC5",
    English: "#FFA41B",
    Science: "#8EAC50",
    "Arts or painting": "#FF2171",
    Gymnastics: "#FF78C4",
  };
  // All subjects are predefined      !noted
  // Maths | English | Science | Arts | Painting | Gymnastics

  return (
    <div className="flex flex-wrap gap-2">
      {subs.map((subject, index) => {
        return (
          <div
            key={index}
            style={{
              color: sub[subject],
            }}
            className="px-2 py-1 text-[13px] bg-white shadow-md rounded-md capitalize flex items-center gap-2"
          >
            <h1>{subject}</h1>
          </div>
        );
      })}
    </div>
  );
}
