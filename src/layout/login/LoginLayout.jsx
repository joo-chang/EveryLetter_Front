import LoginHeader from './LoginHeader'
import Footer from '../Footer'
import { Outlet } from 'react-router'
import Content from '../Content'

/**
 * interface LayoutDefaultPrps {
 *  children ?: React.ReactElement;
 * }
 */

export default function LoginLayout({children}) {
  return (
    <div>
      {/* 해당 layout에서 공통으로 사용되는 Header를 선언해준다. */}
      <LoginHeader/>
        {/* Content 영역 */}
        <Content>
          {/* children이 있을경우는 children을 없을 경우에는 Outlet을 나타내준다 */}
          {children || <Outlet/>}
        </Content>
      {/* 해당 layout에서 공통으로 사용되는 Footer를 선언해준다. */}
      <Footer/>
    </div>
  )
}