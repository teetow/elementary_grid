import { createContext } from "react";

type SessionContextProps = {
  mute: boolean;
  setMute: (state: boolean) => void;
  life: boolean;
  setLife: (state: boolean) => void;
};

const SessionContext = createContext<SessionContextProps>({
  mute: false,
  setMute: () => {},
  life: false,
  setLife: () => {},
});

export default SessionContext;
