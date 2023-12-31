import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User, Avatar} from "@nextui-org/react";

const AppDropdown = ({logOut}) => {
    return (     
        <Dropdown placement="bottom-start" className="bg-dark">
            <DropdownTrigger>
                <Avatar isBordered src={`/avatars/avatar${localStorage.getItem('url_avatar')}.png`} imgProps={{className:'opacity-100 h-full'}}/>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem textValue="Texto del ítem" key="profile" className="h-14 gap-2">
                    <p className="font-bold">Hola</p>
                    <p className="font-bold">{localStorage.getItem('email')}</p>
                </DropdownItem>
                <DropdownItem textValue="Texto del ítem" key="logout" color="danger">
                    <p onClick={logOut}>Log Out</p>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export { AppDropdown }