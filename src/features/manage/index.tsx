import * as React from 'react';
import { useLocation, Route, Switch, Link, useHistory } from 'react-router-dom';
import { Typography, Button, PageHeader, Menu, Layout } from 'antd';
import {
  ExclamationCircleOutlined,
  ExceptionOutlined,
  SoundOutlined,
  SolutionOutlined,
  EyeOutlined,
  NumberOutlined,
  TagsOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useCurrentUser, useLogout } from '../login/redux';
import Users from './components/Users';
import Reports from './components/Reports';
import Feedbacks from './components/Feedbacks';
import SystemNotifications from './components/SystemNotifications';
import ReportDetial from './components/ReportDetial';
import UserAgreement from './components/UserAgreement';
import PrivacyAgreement from './components/PrivacyAgreement';
import PostTopics from './components/PostTopics';
import PetBreeds from './components/PetBreeds';
import Cities from './components/Cities';
import UserDetailPage from './components/UserDetail';
import TestUsers from './components/TestUsers';

const { Header, Content, Sider } = Layout;

const topPathes = new Set([
  '/manage',
  '/manage/users',
  '/manage/feedbacks',
  '/manage/system-notifications',
  '/manage/user-agreement',
  '/manage/privacy-agreement',
  '/manage/post-topics',
  '/manage/pet-breeds',
  '/manage/cities',
  '/manage/test-users',
]);

const Manage = () => {
  const { currentUser } = useCurrentUser();
  const { logout } = useLogout();

  const location = useLocation();
  const history = useHistory();

  const path = location.pathname;

  return (
    <div>
      {currentUser ? (
        <div>
          <Layout style={{ minHeight: '100%' }}>
            <Sider
              // width={150}
              className="site-layout-background"
              collapsed={false}
            >
              <Menu
                defaultSelectedKeys={[`${location.pathname}`]}
                mode="inline"
                theme="dark"
                inlineCollapsed={true}
                onSelect={(d) => {
                  history.push(d.key);
                }}
                style={{ paddingTop: 60 }}
              >
                <Menu.Item key="/manage/test-users" icon={<TeamOutlined />}>
                  Test Users
                </Menu.Item>
                <Menu.Item key="/manage/users" icon={<TeamOutlined />}>
                  Users
                </Menu.Item>
                <Menu.Item key="/manage" icon={<ExclamationCircleOutlined />}>
                  Reports
                </Menu.Item>
                <Menu.Item key="/manage/feedbacks" icon={<ExceptionOutlined />}>
                  Feedbacks
                </Menu.Item>
                <Menu.Item
                  key="/manage/system-notifications"
                  icon={<SoundOutlined />}
                >
                  System Notification
                </Menu.Item>

                <Menu.Item
                  key="/manage/user-agreement"
                  icon={<SolutionOutlined />}
                >
                  User Agreement
                </Menu.Item>
                <Menu.Item
                  key="/manage/privacy-agreement"
                  icon={<EyeOutlined />}
                >
                  Privacy Agreement
                </Menu.Item>
                <Menu.Item key="/manage/post-topics" icon={<NumberOutlined />}>
                  Topics
                </Menu.Item>
                <Menu.Item key="/manage/pet-breeds" icon={<TagsOutlined />}>
                  Breeds
                </Menu.Item>
                <Menu.Item key="/manage/cities" icon={<EnvironmentOutlined />}>
                  City
                </Menu.Item>
              </Menu>
            </Sider>

            <Layout style={{ minHeight: '100vh' }}>
              <PageHeader
                className="site-page-header"
                style={{ background: '#fff' }}
                onBack={
                  !topPathes.has(path)
                    ? () => history.goBack() //() => history.push('/manage')
                    : undefined
                }
                title={`Hi, ${currentUser.name}`}
                // subTitle="This is a subtitle"
                extra={[
                  <Button
                    key="logout"
                    style={{ marginLeft: 16 }}
                    onClick={() => {
                      logout();
                    }}
                  >
                    logout
                  </Button>,
                ]}
              ></PageHeader>

              <div style={{ padding: '0 24px 24px' }}>
                <Switch>
                  <Route exact={true} path="/manage" component={Reports} />
                  <Route exact={true} path="/manage/users" component={Users} />
                  <Route
                    exact={true}
                    path="/manage/users/:userId"
                    component={UserDetailPage}
                  />
                  <Route
                    exact={true}
                    path="/manage/test-users"
                    component={TestUsers}
                  />

                  <Route
                    exact={true}
                    path="/manage/report/:reportId"
                    component={ReportDetial}
                  />
                  <Route
                    exact={true}
                    path="/manage/feedbacks"
                    component={Feedbacks}
                  />
                  <Route
                    exact={true}
                    path="/manage/system-notifications"
                    component={SystemNotifications}
                  />
                  <Route
                    exact={true}
                    path="/manage/user-agreement"
                    component={UserAgreement}
                  />
                  <Route
                    exact={true}
                    path="/manage/privacy-agreement"
                    component={PrivacyAgreement}
                  />
                  <Route
                    exact={true}
                    path="/manage/post-topics"
                    component={PostTopics}
                  />
                  <Route
                    exact={true}
                    path="/manage/pet-breeds"
                    component={PetBreeds}
                  />
                  <Route
                    exact={true}
                    path="/manage/cities"
                    component={Cities}
                  />
                </Switch>
              </div>
            </Layout>
          </Layout>
        </div>
      ) : (
        <div
        // style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 100 }}
        >
          <div
            style={{
              marginTop: 100,
            }}
          >
            <Link
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;
