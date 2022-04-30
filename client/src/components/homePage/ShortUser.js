// styled
import styled from 'styled-components';


export default function ShortUser(props) {

    const { id, email, name } = props.user

    return (
        <Row>
            <th>{id}</th>
            <th>{email}</th>
            <th>{name}</th>
        </Row>
    )
}

const Row = styled.tr`
    font-size: calc(1vw + 10px);

    > th {
        font-weight: normal;
    }
`