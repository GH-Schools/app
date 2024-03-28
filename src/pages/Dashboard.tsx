import React from "react";

const MetricsCard = () => {
  return (
    <div className="flex flex-grow shadow-sm p-6 rounded-xl bg-orange-500 text-white font-bold">
      Metric
    </div>
  );
};

function Dashboard() {
  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      <section className="flex flex-row gap-5">
        {[1, 2, 3, 4].map((a, i) => (
          <MetricsCard key={i} />
        ))}
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-1/3 ">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-72">loading...</div>
        </div>

        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-72">loading...</div>
        </div>

        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-72">loading...</div>
        </div>
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-64">loading...</div>
        </div>

        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white">
          <h3 className="font-bold text-lg">Metric</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-64">loading...</div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
