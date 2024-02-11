import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 mt-6 mb-6 text-gray-500 left-0 right-0 px-4">
      <div className="flex flex-col md:flex-row gap-6 justify-between w-full items-center">
        <p className="text-sm text-gray-400">
          msweb - Forked from{' '}
          <Link
            className="text-indigo-300"
            href="https://portfolio-menviellevalen.vercel.app/"
          >
            {' '}
            Valentín
          </Link>{' '}
          | {new Date().getFullYear()}
        </p>

        <div className="flex gap-2">
          <Link
            className="text-xl hover:text-indigo-400 transition-colors"
            href={'https://github.com/manuelsanchez2'}
          >
            <FaGithub />
          </Link>
          <Link
            className="text-xl hover:text-indigo-400 transition-colors"
            href={'https://www.linkedin.com/in/manusanchez2/'}
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </footer>
  )
}
