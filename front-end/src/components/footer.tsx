const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-10 px-8 pt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 justify-between gap-4 ">
          <p className="text-center mb-10">
            Desenvolvido por Joice Cristina da Silva Santos
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
