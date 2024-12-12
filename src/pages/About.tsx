import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';

function About() {
  return (
    <Layout className="bg-[#87E69B]">
      <Header />

      <div className="prose text-black">
        <h2 className="text-white">ABOUT THE GOOGLE TREE</h2>
        <p>
          The Google Trees is a series of life-size sculptures of trees plucked from Google
          Maps. They reveal how ubiquitous technology filters our view of the natural
          world.
        </p>
        <p>
          The project was conceived by Certain Measures, a design and technology studio
          based in Berlin, with digital media artist Clement Valla. The Google Tree series
          has been presented in Berlin, and will soon be installed in Pisa.
        </p>
        <p>
          Google's tech creates a 3D model of our world, mostly focusing on buildings,
          and ends up turning trees and the natural objects into weird, simplified shapes.
          This sculpture brings one of those distorted digital trees to life, giving people a
          chance to see up close something that's usually meant to be seen from way
          above, like by a drone or satellite. The sculpture messes with how we normally
          think of nature by showing us a tree that looks strange and unfamiliar, at a large
          scale. It's meant to make you stop and think about how technology shapes the
          way we see the world.
        </p>
        <p>
          The Google Tree also brings in a bit of humor to get people thinking about bigger
          issues, like the climate crisis. By making you react to this strange, digital version
          of a tree, the sculpture opens up questions about how much we rely on
          technology and what that means for our future, especially when it comes to
          nature. Is this digital tree a quirky mistake from our time, or a symbol of a
          species we might lose?
        </p>
        <p>
          In the end, the project encourages people to think about the gap between what
          we see digitally and what we experience in real life, sparking a conversation
          about technology, perception, and the environment.
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