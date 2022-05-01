import { useEffect, useState, useContext } from 'react'
//components
import ShortUser from '@components/homePage/ShortUser.js'
// context
import { AuthContext } from '@src/context/AuthContext.js'
// hooks
import { useHttp } from '@hooks/http.hook.js'
import { useMessage } from '@hooks/message.hook.js'
// config
import config from '@config/config.js'
// styled
import styled from 'styled-components';


export default function HomePage() {

    const [userList, setUserList] = useState({});
    const { request } = useHttp()

    const auth = useContext(AuthContext)
    const message = useMessage();

    // Получаем Продукты
    useEffect(() => {
        async function getUserList() {
            let data
            const accessToken = localStorage.getItem('accessToken')
            const refreshToken = localStorage.getItem('refreshToken')
            try {

                data = await request({
                    url: `${config.authServerUrl}/api/user/list`,
                    method: 'GET',
                    body: null,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })

                setUserList(data)
            } catch (error) {
                // оповещение о времени жизни токена оставил специально для наглядности
                const tokens = await request({
                    url: `${config.authServerUrl}/api/user/refresh`,
                    method: 'POST',
                    body: { refreshToken }
                })

                auth.refresh(tokens.accessToken, tokens.refreshToken)
            }
        }
        getUserList()
    }, [request, message, auth]);

    return (
        <Table>
            <TableBody>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
                </tr>
                {(userList && userList.length > 0) && userList.map(user => {
                    return <ShortUser key={user.id} user={user} />
                })}
            </TableBody>
        </Table>
    )
}

const Table = styled.table`
    max-width: 800px;
    margin: 50px auto;
`

const TableBody = styled.tbody`
    margin: 15% auto;
    border: 1px #ccc solid;

    > tr > th {
        width 10%;
    }
`


