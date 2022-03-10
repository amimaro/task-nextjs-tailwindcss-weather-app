/* eslint-disable @next/next/no-img-element */
export const AppLoader = () => {
  return (
    <div className="relative w-full h-96">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src="./spinner.svg" alt="loader spinner" width={150} />
      </div>
    </div>
  );
};
