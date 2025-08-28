import BlurText from "@/Components/UI/BlurText";



const Settings = () => {
  return (
    <>
      <BlurText
        text="Profile Settings"
        animateBy="words"
        delay={300}
        stepDuration={0.5}
        className="text-3xl text-slate-950 font-semibold"
        animationFrom={{ opacity: 0, scale: 0.5, y: 50 }}
        animationTo={[
          { opacity: 0.5, scale: 1.05, y: -10 },
          { opacity: 1, scale: 1, y: 0 },
        ]}
      />



    </>
  );
};

export default Settings;