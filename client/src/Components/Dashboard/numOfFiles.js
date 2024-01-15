import { Get } from '../../Hooks/fetchWithHook';

function GetNum(props) {
    const { data, loading, error } = Get(props.path);
    if (loading) return <p>Loading...</p>;
    if (error) { return <p>Error!</p>; }
    return (
        <span>{data[0].num}</span>
    )
}

function Fake(props) {
    return <GetNum path={`dash/fake/${props.id}`}></GetNum>;
}

function Checked(props) {
    return <GetNum path={`dash/checked/${props.id}`}></GetNum>;
}

function Check(props) {
    return <GetNum path={`dash/check/${props.id}`}></GetNum>;
}

function Active(props) {

    return <GetNum path={`dash/active/${props.id}`}></GetNum>
}
export { Active, Fake, Check, Checked };