import { VscError } from "react-icons/vsc";

const ErrorMsg = ({ error }) => {
  return (
    <section className="min-h-[50vh] p-4 grid gap-5 items-center justify-center">
      <div className="grid gap-5 items-center justify-center">
        <article className="text-6xl text-red-600 mx-auto">
          <VscError />
        </article>
        <article className="ml-3">
          <p className="text-md text-center text-gray-700 dark:text-gray-300">
            {error || "Could not fetch data"}
          </p>
        </article>
      </div>
    </section>
  );
};

export default ErrorMsg;
