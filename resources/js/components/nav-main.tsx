import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) =>
                    item.children ? (
                        <ExpandableMenu key={item.title} item={item} currentUrl={page.url} />
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.url === page.url}>
                                <Link href={item.url!} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function ExpandableMenu({ item, currentUrl }: { item: NavItem; currentUrl: string }) {
    const hasActiveChild = item.children?.some((child) => currentUrl.startsWith(child.url || '')) ?? false;
    const [open, setOpen] = useState(hasActiveChild);

   
    useEffect(() => {
        if (hasActiveChild) setOpen(true);
    }, [hasActiveChild]);

    return (
        <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setOpen((prev) => !prev)} isActive={hasActiveChild}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <span className="ml-auto">{open ? <ChevronUp /> : <ChevronDown />}</span>
            </SidebarMenuButton>

            {open && (
                <div className="ml-6 mt-1 space-y-1">
                    {item.children!.map((child) => {
                        const isActive = currentUrl === child.url;
                        return (
                            <Link
                                key={child.title}
                                href={child.url!}
                                className={`block px-2 py-1 text-sm rounded-md ${
                                    isActive
                                        ? 'bg-neutral-800 text-white'
                                        : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                                }`}
                            >
                                {child.title}
                            </Link>
                        );
                    })}
                </div>
            )}
        </SidebarMenuItem>
    );
}
