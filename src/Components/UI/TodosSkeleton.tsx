interface ITodosSkeleton {
  intialofCard?: number;

}

const TodosSkeleton = ({intialofCard=3}:ITodosSkeleton) => {
  return (
    <>
    
<div role="status" className=" animate-pulse space-x-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
  {Array.from({ length: intialofCard }).map((_, index) => (
      <div key={index} className="   rounded-xl shadow-md p-8 space-y-4 border border-gray-200 w-85 h-40 bg-gray-200  dark:bg-gray-700  mb-4"></div>

  ))}
    <span className="sr-only">Loading...</span>
</div>


    </>
  );
};

export default TodosSkeleton;