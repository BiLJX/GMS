interface HeaderProps {
    title: string,
    Icon: any
}
export default function Header({
    title,
    Icon
}: HeaderProps){
    return(
        <header className="sticky top-0 pl-[var(--nav-width)] py-4">
            <div className="p-4 pl-8 flex">
                <div className="text-gray-700 flex space-x-4 items-center">
                    <Icon style = {{fontSize: "2rem"}} />
                    <div className="text-xl font-bold">{title}</div>
                </div>
            </div>
        </header>
    )
}