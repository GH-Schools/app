import React from "react";


function Application() {
  return (
    <div className="flex flex-col gap-7 my-5 mx-5">
      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white w-1/3 ">
          <h3 className="font-bold text-lg">Form Section 1</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-72">loading...</div>
        </div>
      </section>

      <section className="flex flex-row gap-5">
        <div className="flex flex-col flex-grow shadow-sm px-6 pt-4 pb-6 rounded-xl gap-2 bg-white">
          <h3 className="font-bold text-lg">Form Section 2</h3>
          <div className="flex items-center justify-center rounded-lg border w-full h-64">loading...</div>
        </div>
      </section>
    </div>
  );
}

export default Application;
