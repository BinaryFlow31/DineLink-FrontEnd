interface StepsProps {
  head: string;
  para1: string;
  para2: string;
  image: string;
}

const Steps = ({head, para1, para2, image}: StepsProps) => {
  return (
    <div className="flex justify-center items-center flex-col">
        <img src={image} alt="Step 1" className="w-24" />
        <div className="flex justify-around items-center flex-col text-center">
            <h1 className="text-xl font-bold text-white">{head}</h1>
            <p className="text-md text-white font-light">{para1}<br/>{para2}</p>
        </div>
    </div>
  )
}

export default Steps