import { NativeModules } from 'react-native';

type JpushRomWrapperType = {
  multiply(a: number, b: number): Promise<number>;
};

const { JpushRomWrapper } = NativeModules;

export default JpushRomWrapper as JpushRomWrapperType;
