import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { ROUTES } from '@/router/routes';
import {
  BookA,
  BotMessageSquare,
  Calendar,
  CaseLower,
  Languages,
  Mail,
  Search,
  Settings,
} from 'lucide-react';

const AppSidebar = () => {
  const { setOpen, setOpenMobile, open, openMobile } = useSidebar();
  const items = [
    {
      title: 'Ask AI',
      url: ROUTES.ASK_AI,
      icon: BotMessageSquare,
    },
    {
      title: 'Email Generator',
      url: ROUTES.EMAIL_GENERATOR,
      icon: Mail,
    },
    {
      title: 'Paraphraser',
      url: ROUTES.PARAPHRASER,
      icon: BookA,
    },
    {
      title: 'Text Transform',
      url: ROUTES.TEXT_TRANSFORMER,
      icon: CaseLower,
    },
    {
      title: 'Translate',
      url: ROUTES.TRANSLATE,
      icon: Languages,
    },
  ];

  const isMobile = useIsMobile();

  const toggleSidebar = (isOpen: boolean = false) => {
    if (isMobile) {
      setOpenMobile(isOpen);
    } else {
      setOpen(isOpen);
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      onMouseEnter={() => toggleSidebar(true)}
      onMouseLeave={() => toggleSidebar(false)}
    >
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
