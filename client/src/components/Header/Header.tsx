interface HeaderProps {
    title: string,
    Icon: any
}
export default function Header({
    title,
    Icon
}: HeaderProps){
    return(
        <header className="sticky top-0 pl-[var(--nav-width)] bg-white-100 z-10">
            <div className="p-4 pl-8 flex">
                <div className="text-gray-700 flex space-x-4 items-center">
                    <Icon style = {{fontSize: "1.5rem"}} />
                    <div className="text-lg font-bold">{title}</div>
                </div>
            </div>
        </header>
    )
}