"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible"
import { cn } from "~/lib/utils"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar"

/** Third level: links under a menu (category → menu → submenu). */
export type NavSubmenuItem = { title: string; url: string }

/** Second level: one collapsible row (optional submenu). */
export type NavMenuEntry = {
  title: string
  /** Primary navigation target for the menu row. */
  url: string
  icon: LucideIcon
  /** Use for leaf routes like `/dashboard` so nested paths don’t highlight it. */
  exact?: boolean
  /** Submenu entries; omit or leave empty for a single leaf link. */
  items?: NavSubmenuItem[]
}

/** Top level: sidebar section grouping related menus. */
export type NavCategory = {
  label: string
  /** Tailwind background class for the category marker dot (e.g. `bg-violet-500`). */
  accentDot?: string
  menus: NavMenuEntry[]
}

function normalizePath(p: string) {
  if (!p || p === "#") return ""
  const t = p.replace(/\/$/, "")
  return t === "" ? "/" : t
}

function isActivePath(
  pathname: string,
  url: string,
  options?: { exact?: boolean }
): boolean {
  const path = normalizePath(pathname)
  const target = normalizePath(url)
  if (!target || target === "#") return false
  if (options?.exact) return path === target
  return path === target || path.startsWith(`${target}/`)
}

function menuHasOpenSubmenu(items: NavSubmenuItem[] | undefined, pathname: string) {
  return Boolean(items?.some((sub) => isActivePath(pathname, sub.url)))
}

function menuRowActive(
  pathname: string,
  menu: NavMenuEntry,
  hasSub: boolean
): boolean {
  if (!hasSub) {
    return isActivePath(pathname, menu.url, { exact: menu.exact })
  }
  return (
    menuHasOpenSubmenu(menu.items, pathname) ||
    isActivePath(pathname, menu.url, { exact: menu.exact })
  )
}

export function NavMain({ categories }: { categories: NavCategory[] }) {
  const pathname = usePathname()

  return (
    <>
      {categories.map((category) => (
        <SidebarGroup key={category.label}>
          <SidebarGroupLabel className="flex items-center gap-2">
            {category.accentDot ? (
              <span
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  category.accentDot
                )}
                aria-hidden
              />
            ) : null}
            <span className="font-semibold tracking-wide uppercase">
              {category.label}
            </span>
          </SidebarGroupLabel>
          <SidebarMenu>
            {category.menus.map((menu) => {
              const hasSub = Boolean(menu.items?.length)

              if (!hasSub) {
                const active = isActivePath(pathname, menu.url, {
                  exact: menu.exact,
                })
                return (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={menu.title}
                    >
                      <Link href={menu.url}>
                        <menu.icon />
                        <span>{menu.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }

              const defaultOpen =
                menuHasOpenSubmenu(menu.items, pathname) ||
                isActivePath(pathname, menu.url, { exact: menu.exact })

              const rowActive = menuRowActive(pathname, menu, true)

              return (
                <Collapsible
                  key={menu.title}
                  asChild
                  defaultOpen={defaultOpen}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={rowActive}
                      tooltip={menu.title}
                    >
                      <Link href={menu.url}>
                        <menu.icon />
                        <span>{menu.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle submenu</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {menu.items!.map((sub) => (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isActivePath(pathname, sub.url)}
                            >
                              <Link href={sub.url}>
                                <span>{sub.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
