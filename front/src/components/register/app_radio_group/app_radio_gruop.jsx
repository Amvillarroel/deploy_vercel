import { Image, RadioGroup } from '@nextui-org/react';
import './inputstye.css'

const avatarImages = ['_bird', '_cat', '_dog', '_react', '_vite'];

const AppRadioGruop = ({avatarInput, onAvatarSeleccionado = (data) => {}}) => {
    const handleSeleccionAvatar = (e) => {
        onAvatarSeleccionado(e.target.value);
    }
    return (
        <RadioGroup
            ref={avatarInput}
            label="Selecciona tu avatar favorito"
            orientation="horizontal"
            id='radioGroup'
            classNames={{
                wrapper:[
                    "justify-around"
                ]
            }}
        >
            {avatarImages.map((avatar, index) => (
                <label key={index}>
                    <input
                        type="radio"
                        name="avatar"
                        value={avatar}
                        className="hidden"
                        onChange={(e) => handleSeleccionAvatar(e)}
                    />
                    <Image
                        width={32}
                        alt={avatar}
                        src={`/avatars/avatar${avatar}.png`}
                        className="avatarImage opacity-1"
                    />
                </label>
            ))}
        </RadioGroup>
    )
}

export { AppRadioGruop }