import React from 'react'
import Link from 'next/link'

type ButtonProps = {
    link?: string
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    children: React.ReactNode
}

const variantStyles = {
    primary: 'bg-primary text-primary-text hover:bg-primary/90',
    secondary: 'bg-secondary text-primary-text hover:bg-secondary/90',
    outline: 'border border-primary text-primary hover:bg-primary/10',
}

const sizeStyles = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({ 
  link, 
  children, 
  variant = "primary", 
  size = "md" }: ButtonProps) {
  const className = `inline-flex items-center gap-2 rounded-md font-medium transition-colors cursor-pointer
    ${variantStyles[variant]} ${sizeStyles[size]}`;
  if (link) {
    return <Link href={link} className={className}>{children}</Link>;
  }
  return <button className={className}>{children}</button>;
}