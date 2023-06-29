import useALICE from '../../contexts/ALICE/useALICE.ts';
import useCreateAction from '../../contexts/CreateAction/useCreateAction.ts';
import { useMemo, useState } from 'react';
import { FadeIn, MoveUpIn } from '../../animations';
import AmountInput from '../../components/Common/AmountInput.tsx';
import Modal from '../../components/Common/Modal.tsx';
import { AnimatePresence } from 'framer-motion';
import useLPToken from '../../contexts/LPToken/useLPToken.ts';
import useBonALICE from '../../contexts/BonALICE/useBonALICE.ts';

export const RenderCreateBody = () => {
  const { ALICEBalance } = useALICE();
  const { allowance: bonALICEAllowance } = useBonALICE();
  const { allowance: LPTokenAllowance } = useLPToken();
  const { LPTokenBalance } = useLPToken();
  const {
    createAmount,
    createBoostAmount,
    handleCreateAmountChange,
    handleCreateBoostAmountChange,
    handleCreateBonALICEClicked,
    createActionLoading,
    handleApproveBonALICEClicked,
    handleApproveLPTokenClicked,
    isAllowanceModalOpen,
    closeAllowanceModal,
    approveBonALICELoading,
    approveLPTokenLoading,
  } = useCreateAction();

  const [isBoostSectionOpen, setIsBoostSectionOpen] = useState(false);

  const isCreateBondedALICEButtonDisabled = useMemo(() => {
    return (
      !bonALICEAllowance ||
      (!LPTokenAllowance && createBoostAmount.big > BigInt(0)) ||
      !createAmount ||
      createAmount.big === BigInt(0) ||
      !ALICEBalance ||
      ALICEBalance.big === BigInt(0) ||
      ALICEBalance.dsp < createAmount.dsp ||
      createActionLoading
    );
  }, [
    ALICEBalance,
    createAmount,
    createActionLoading,
    bonALICEAllowance,
    LPTokenAllowance,
    createBoostAmount,
  ]);

  return (
    <>
      <FadeIn duration={0.1} delay={0.1}>
        <AmountInput
          rightText={'ALICE'}
          balance={ALICEBalance ? ALICEBalance.dsp : '...'}
          value={createAmount.hStr}
          onValueChanged={handleCreateAmountChange}
        />
      </FadeIn>
      <AnimatePresence>
        {isBoostSectionOpen ? (
          <MoveUpIn className="mb-4" y={-10} duration={0.3} delay={0}>
            <AmountInput
              rightText={'LP ALICE'}
              balance={LPTokenBalance ? LPTokenBalance.dsp : '...'}
              withIcon
              iconClicked={() => {
                handleCreateBoostAmountChange('');
                setIsBoostSectionOpen(false);
              }}
              value={createBoostAmount.hStr}
              onValueChanged={handleCreateBoostAmountChange}
            />
          </MoveUpIn>
        ) : (
          <FadeIn duration={0.1} delay={0.1}>
            <p
              onClick={() => setIsBoostSectionOpen(true)}
              className="max-md:text-sm font-light underline mb-8 md:mb-10 cursor-pointer"
            >
              I Want to Boost Bonded ALICE Power with LP Tokens
            </p>
          </FadeIn>
        )}
      </AnimatePresence>
      <FadeIn duration={0.1} delay={0.1}>
        <span className="flex justify-between max-md:text-sm text-gray10 mb-1 md:mb-2">
          <p className="font-light">Your bonALICE power will be</p>
          <p className="font-medium">{createAmount.dsp}</p>
        </span>
      </FadeIn>
      <FadeIn duration={0.1} delay={0.1}>
        <span className="flex justify-between text-gray10 max-md:text-sm">
          <p className="font-light">Your tier will be</p>
          <p className="font-medium">ALICE Supreme (Tier 3)</p>
        </span>
      </FadeIn>
      <FadeIn
        duration={0.1}
        delay={0.1}
        className="mt-auto max-md:mt-10 max-md:w-[80vw] mx-auto"
      >
        {bonALICEAllowance && bonALICEAllowance.big < createAmount.big ? (
          <button
            onClick={() => handleApproveBonALICEClicked()}
            className="btn !w-full"
            disabled={isCreateBondedALICEButtonDisabled}
          >
            Approve {createAmount.hStr} ALICE
          </button>
        ) : LPTokenAllowance && LPTokenAllowance.big < createBoostAmount.big ? (
          <button
            onClick={() => handleApproveLPTokenClicked()}
            className="btn !w-full"
            disabled={isCreateBondedALICEButtonDisabled}
          >
            Approve {createBoostAmount.hStr} LP Token
          </button>
        ) : (
          <button
            onClick={() => handleCreateBonALICEClicked()}
            className="btn !w-full"
            disabled={isCreateBondedALICEButtonDisabled}
          >
            Create Bonded ALICE
          </button>
        )}
      </FadeIn>
      <Modal
        title=""
        size="sm"
        isOpen={isAllowanceModalOpen}
        closeModalHandler={closeAllowanceModal}
      >
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-[108px] mb-10"
            src="/assets/images/claim/switch-wallet-modal-icon.svg"
            alt=""
          />
          <p className="text-center mb-6">
            You need to approve the ALICE token to be spent by the{' '}
            {bonALICEAllowance && bonALICEAllowance?.big < createAmount?.big
              ? 'BonALICE Contract'
              : 'LP Token Contract'}
            . Enter at least the amount you want to create and click Next then
            Approve button on metamask.
          </p>
          {bonALICEAllowance && bonALICEAllowance?.big < createAmount?.big ? (
            <button
              className="btn btn--dark-primary"
              onClick={() =>
                !approveBonALICELoading && handleApproveBonALICEClicked()
              }
            >
              {approveBonALICELoading ? 'Waiting for Metamask...' : 'Approve'}
            </button>
          ) : (
            <button
              className="btn btn--dark-primary"
              onClick={() =>
                !approveLPTokenLoading && handleApproveLPTokenClicked()
              }
            >
              {approveLPTokenLoading ? 'Waiting for Metamask...' : 'Approve'}
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};
