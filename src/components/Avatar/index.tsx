import PersonIcon from "../Icons/Person";

import * as Styled from "./Avatar.styled";

type AvatarProps = {
  src: string | undefined;
};

function Avatar({ src }: AvatarProps) {
  return (
    <Styled.Avatar>
      {src ? (
        <img src={src} alt="avatar" width={65} height={65} />
      ) : (
        <PersonIcon />
      )}
    </Styled.Avatar>
  );
}

export default Avatar;
