import { useActivities } from "@/hooks";
import Layout from "@/components/Layout";
import { ActivitiesList } from "@/components";

const ActivitiesPage = (): JSX.Element => {
  const { data, isLoading } = useActivities({ lastFive: false });
  console.log({ data });

  return (
    <Layout>
      <h1>Movimientos</h1>

      <ActivitiesList title="Tus movimientos" activities={data?.activities} />
    </Layout>
  );
};

export default ActivitiesPage;
