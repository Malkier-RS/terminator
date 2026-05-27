import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-accent text-brand-black hover:bg-brand-accent-hover font-semibold",
  secondary:
    "bg-brand-white text-brand-black hover:bg-brand-light font-semibold",
  outline:
    "border border-brand-light/30 text-brand-white hover:border-brand-accent hover:text-brand-accent",
  ghost: "text-brand-light hover:text-brand-accent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-sm tracking-wide uppercase transition-all duration-300",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="font-[family-name:var(--font-display)] text-4xl uppercase tracking-wider text-brand-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-brand-muted text-lg sm:text-xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-1 w-16 bg-brand-accent",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}

interface HighlightCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function HighlightCard({ icon, title, description }: HighlightCardProps) {
  return (
    <div className="card-glow group rounded-sm bg-brand-dark p-8 transition-all duration-300 hover:-translate-y-1">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-sm bg-brand-gray text-brand-accent transition-colors group-hover:bg-brand-accent group-hover:text-brand-black">
        {icon}
      </div>
      <h3 className="mb-3 font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-brand-white">
        {title}
      </h3>
      <p className="text-brand-muted leading-relaxed">{description}</p>
    </div>
  );
}

interface StatProps {
  value: string;
  label: string;
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className="text-center">
      <div className="font-[family-name:var(--font-display)] text-5xl text-brand-accent sm:text-6xl lg:text-7xl">
        {value}
      </div>
      <div className="mt-2 text-sm uppercase tracking-widest text-brand-muted">
        {label}
      </div>
    </div>
  );
}

interface NavLink {
  href: string;
  label: string;
}

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
  navLinks: NavLink[];
}

export { type NavLink, type HeaderProps };
