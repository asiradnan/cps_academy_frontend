import {Home} from "@/app/_components/home"

export const generateMetadata = async function () {
  return {
    title: "CPS Academy here"
  }
}

export default function HomePage(){
  return <Home/>
}
