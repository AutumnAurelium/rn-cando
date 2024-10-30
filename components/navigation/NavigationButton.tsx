import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { Href, usePathname, useRouter, useUnstableGlobalHref } from 'expo-router';
import { PropsWithChildren, type ComponentProps } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    style?: StyleProp<TextStyle>,
    nameActive: ComponentProps<typeof Ionicons>['name'];
    nameInactive: ComponentProps<typeof Ionicons>['name'];
    screen: Href<string | object>;
    matchPath: string,
    color: ComponentProps<typeof Ionicons>['color'];
};

export function NavigationButton({ style, nameActive, nameInactive, screen, matchPath, color }: Props) {
    const pathname = usePathname();
    const router = useRouter();

    const name = pathname === matchPath ? nameActive : nameInactive;
    return (
        <Ionicons size={48} style={[{}, style]} name={name} color={color} onPress={() => {
            router.push(screen);
        }}/>
    );
}