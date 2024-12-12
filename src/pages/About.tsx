import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';

function About() {
  return (
    <Layout className="bg-[#87E69B]">
      <Header />

      <div className="prose text-black">
        <h2 className="text-white">ÜBER DEN GOOGLE-BAUM</h2>
        <p>
          Die Google Trees ist eine Serie lebensgroßer Baumskulpturen, die aus Google
          Maps entnommen wurden. Sie zeigen, wie allgegenwärtige Technologie unseren
          Blick auf die natürliche Welt filtert.
        </p>
        <p>
          Das Projekt wurde von Certain Measures, einem Design- und Technologiestudio
          in Berlin, zusammen mit dem digitalen Medienkünstler Clement Valla konzipiert.
          Die Google Tree-Serie wurde bereits in Berlin präsentiert und wird demnächst in
          Pisa installiert.
        </p>
        <p>
          Googles Technologie erstellt ein 3D-Modell unserer Welt, wobei der Fokus
          hauptsächlich auf Gebäuden liegt. Dabei werden Bäume und natürliche Objekte
          in seltsame, vereinfachte Formen verwandelt. Diese Skulptur erweckt einen
          dieser verzerrten digitalen Bäume zum Leben und gibt Menschen die
          Möglichkeit, etwas aus der Nähe zu betrachten, das normalerweise nur aus
          großer Höhe, wie von einer Drohne oder einem Satelliten, gesehen wird. Die
          Skulptur spielt mit unserer gewohnten Wahrnehmung der Natur, indem sie uns
          einen Baum zeigt, der fremd und ungewohnt erscheint, und das in
          Lebensgröße. Sie soll uns zum Nachdenken darüber anregen, wie Technologie
          unsere Sicht auf die Welt prägt.
        </p>
        <p>
          Der Google-Baum bringt auch eine humorvolle Note ein, um Menschen zum
          Nachdenken über größere Themen wie die Klimakrise anzuregen. Indem er uns
          mit dieser seltsamen, digitalen Version eines Baumes konfrontiert, wirft die
          Skulptur Fragen über unsere Technologieabhängigkeit auf und was diese für
          unsere Zukunft bedeutet, besonders in Bezug auf die Natur. Ist dieser digitale
          Baum nur eine kuriose Fehldarstellung unserer Zeit oder ein Symbol für eine
          Art, die wir verlieren könnten?
        </p>
        <p>
          Letztendlich regt das Projekt dazu an, über die Kluft zwischen digitaler
          Wahrnehmung und realer Erfahrung nachzudenken und eröffnet einen Dialog
          über Technologie, Wahrnehmung und Umwelt.
        </p>

        

        <h2 className="text-white mt-12">ABOUT FREILUFT</h2>
        <p>
          2 Skulpturen und Installationen von internationalen, relevanten Künstler:innen
          und Architekt:innen machen die Stadt für jeweils drei Monate zum zentralen
          Ort für zeitgenössische Kunst und Stadttransformation und ziehen mindestens
          300.000 Besucher in das wunderschöne Bergische Land.
        </p>

        <hr className="my-8 border-white" />

        <div className="mt-12 text-sm text-gray-700">
          © 2024 Google Tree Wuppertal. All rights reserved.
        </div>
      </div>
    </Layout>
  );
}

export default About;
