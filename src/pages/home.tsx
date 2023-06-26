import { ActivityForm } from "@/components/Forms/ActivityForm";
import { ActivitiesList } from "@/components";
import { useActivities } from "@/hooks";
import Layout from "@/components/Layout";

const HomePage = (): JSX.Element => {
  const { activities } = useActivities({ lastFive: true });

  console.log({activities})

  return (
    <Layout>
      <h1>Dashboard</h1>
      {/* <Analitycs /> */}
      <ActivityForm />
      <ActivitiesList
        title="Tus últimos movimientos"
        expand={true}
        activities={activities}
      />
    </Layout>
  );
};

export default HomePage;
