import { Playfair_Display } from 'next/font/google'
import styles from './page.module.css'
import './iframe.css'

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/background.png)' }}>
      <main className={`${styles.main} text-white`} >
        <section className={playfair.className}>
          <h2 className="text-center text-8xl text-white" style={{ fontFamily: '"la-bohemienne", sans-serif', fontWeight: 400, fontStyle: 'normal' }}>Hochzeit</h2>
          <h2 className="text-center text-6xl text-white" style={{ fontFamily: '"la-bohemienne", sans-serif', fontWeight: 400, fontStyle: 'normal' }}>Doro & Felix</h2>


          <button className="flex align-center mx-auto mt-10 bg-transparent hover:bg-amber-100 text-white font-semibold hover:text-black py-2 px-4 border border-amber-200 hover:border-transparent rounded">
            <a href="https://mega.nz/filerequest/yPZaQ6HLPxc" target="_blank" >Hier Fotos hochladen</a>
          </button>



          <p className="
  first-letter:text-7xl first-letter:font-bold 
  first-letter:mr-3 first-letter:float-left text-justify text-lg mt-12 ">Liebe Gäste von Dorothea und Felix,

            folgende Zeilen sollen geheim bleiben… Falls einer der beiden sich also gerade in Eurer Nähe befindet, lasst euch nicht erwischen!

            Damit Doro und Felix ihre Hochzeit im Nachhinein aus möglichst vielen Blickwinkeln erleben können, bitten wir Euch im Laufe des Tages kurze Fotos aufzunehmen (wer mag auch gerne Videos) und diese über den Button oben hochzuladen.
            Auf eurer kleinen Karte steht ein Zeitslot- bitte macht zu dieser Zeit Fotos. Ihr seid herzlich eingeladen, auch Fotos zu anderen Zeiten hinzuzufügen.

          </p>
          <ul className="mt-10">
            Hier ein paar Ideen für die Momentaufnahmen:
            <li>- Selfies</li>
            <li>- Lustige Situationen</li>
            <li>- Schöne/emotionale Momente</li>


          </ul>
          <p className="mt-10">
            Eurer Kreativität sind keine Grenzen gesetzt! Schön wäre es, wenn das Brautpaar nichts von den Aufnahmen bemerkt. Macht Euch aber keinen Stress und genießt den Tag!

            Liebe Grüße,
            Clemens & Cila

            P.S.: Bei Rückfragen meldet euch gerne bei einem von uns beiden.</p>

        </section>

        <footer
          className="mt-20 text-center border-t border-amber-200/30 pt-8"
          style={{ fontFamily: '"rokkitt", serif', fontWeight: 400, fontStyle: 'normal' }}
        >
          <div className="max-w-md mx-auto">
            <p className="text-sm text-amber-100/80 mb-4" style={{ fontFamily: '"rokkitt", serif', fontWeight: 400, fontStyle: 'normal' }}>
              &ldquo;Die Liebe ist die schönste Melodie des Lebens&rdquo;
            </p>
            <div className="flex justify-center space-x-6 text-xs text-amber-100/60">
              <span> Hochzeit Doro & Felix</span>
              <span>•</span>
              <span>Mit ❤️ gemacht</span>
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}
