import { Routes, Route, BrowserRouter } from 'react-router-dom';

import ReviewDetail from './pages/ReviewDetail';
import ClaimPrize from './pages/ClaimPrize';
import GetStarted from './pages/GetStarted';
import Actions from './pages/Actions';
import Home from './pages/Home';

import Navbar from './components/Common/Navbar.tsx';

import { TransferActionProvider } from './contexts/TransferAction/TransferActionContext.tsx';
import { UpgradeActionProvider } from './contexts/UpgradeAction/UpgradeActionContext.tsx';
import { CreateActionProvider } from './contexts/CreateAction/CreateActionContext.tsx';
import { MergeActionProvider } from './contexts/MergeAction/MergeActionContext.tsx';
import { SplitActionProvider } from './contexts/SplitAction/SplitActionContext.tsx';
import { UserProfileProvider } from './contexts/UserProfile/UserProfileContext.tsx';
import { ClaimPrizeProvider } from './contexts/ClaimPrize/ClaimPrizeContext.tsx';
import { BonALICEProvider } from './contexts/BonALICE/BonALICEContext.tsx';
import { ActionsProvider } from './contexts/Actions/ActionsContext.tsx';
import { Web3Provider } from './contexts/Web3/Web3Context.tsx';
import { ALICEProvider } from './contexts/ALICE/ALICEContext.tsx';

function App() {
  return (
    <div className="app">
      <Web3Provider>
        <UserProfileProvider>
          <ALICEProvider>
            <BonALICEProvider>
              <ActionsProvider>
                <CreateActionProvider>
                  <UpgradeActionProvider>
                    <MergeActionProvider>
                      <SplitActionProvider>
                        <TransferActionProvider>
                          <ClaimPrizeProvider>
                            <BrowserRouter>
                              <Navbar />
                              <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/create" element={<Actions />} />
                                <Route
                                  path="/get-started"
                                  element={<GetStarted />}
                                />
                                <Route path="/claim" element={<ClaimPrize />} />
                                <Route
                                  path="/review"
                                  element={<ReviewDetail />}
                                />
                              </Routes>
                            </BrowserRouter>
                          </ClaimPrizeProvider>
                        </TransferActionProvider>
                      </SplitActionProvider>
                    </MergeActionProvider>
                  </UpgradeActionProvider>
                </CreateActionProvider>
              </ActionsProvider>
            </BonALICEProvider>
          </ALICEProvider>
        </UserProfileProvider>
      </Web3Provider>
    </div>
  );
}

export default App;
