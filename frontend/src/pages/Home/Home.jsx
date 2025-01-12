import SideBar from "@components/SideBar/SideBar";
import MessagesContainer from "@components/Messages/MessagesContainer";

const Home = () => {
  return (
    <section className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <SideBar />
      <MessagesContainer />
    </section>
  );
};

export default Home;
