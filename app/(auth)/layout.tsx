export default function AuthLayout({children}: {children: React.ReactNode}) {
    return ( 
        <div className="bg-emerald-400 h-full">
            {children}
        </div>
     );
  }