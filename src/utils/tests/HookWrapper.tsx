import { FC } from 'react';

export const Filler: FC<{ hook: any }> = () => null;
export const HookWrapper: FC<{ hook: () => void }> = (props: any) => <Filler hook={props.hook()} />;

