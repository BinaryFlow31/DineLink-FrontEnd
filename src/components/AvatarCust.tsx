import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

type AvatarCustProps = {
  img: string;
  alt: string;
}

const AvatarCust = ({img, alt}: AvatarCustProps) => {
  return (
    <Avatar className="w-10 h-10">
      <AvatarImage src={img} alt="@shadcn" />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  )
}

export default AvatarCust