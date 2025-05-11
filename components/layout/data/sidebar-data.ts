"use client";

import { LayoutDashboard, Package, Settings } from "lucide-react";

export interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
}

export type ValidRoute = `/${string}`;

export type NavLink<TRoute extends ValidRoute = ValidRoute> = BaseNavItem & {
  url: TRoute;
  items?: never;
};

export type NavCollapsible<TRoute extends ValidRoute = ValidRoute> =
  BaseNavItem & {
    items: (BaseNavItem & { url: TRoute })[];
    url?: never;
  };

export type NavItem<TRoute extends ValidRoute = ValidRoute> =
  | NavCollapsible<TRoute>
  | NavLink<TRoute>;

export interface NavGroup<TRoute extends ValidRoute = ValidRoute> {
  title: string;
  items: NavItem<TRoute>[];
}

export interface SidebarData<TRoute extends ValidRoute = ValidRoute> {
  navGroups: NavGroup<TRoute>[];
}

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: "Menu",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Apps",
          url: "/dashboard/apps",
          icon: Package,
        },
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ],
};
