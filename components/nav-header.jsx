import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';


export const NavHeader = () => {
    return (
        <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
    );
}
