import NavBar from "./_components/nav";

export default function RootLayout({ children }) {
    return (
        <>
            <NavBar />
            {children}
        </>

    )
}