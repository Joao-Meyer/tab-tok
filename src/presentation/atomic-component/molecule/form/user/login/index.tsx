import { type FC, useState } from 'react';
import { FormButton, InputController } from 'presentation/atomic-component/atom';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUserLogin } from 'data/use-case';

export const UserLoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    onSubmit,
    control,
    formState: { isSubmitting }
  } = useUserLogin();

  return (
    <form className={'flex flex-col gap-5 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <InputController
        autoFocus
        control={control}
        labelTop={'E-mail'}
        name={'email'}
        placeholder={'Digite seu e-mail'}
        required
        type={'email'}
      />

      <InputController
        EndIcon={
          <IconButton onClick={(): void => setShowPassword((old) => !old)} tabIndex={-1}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        }
        control={control}
        labelTop={'Senha'}
        name={'password'}
        placeholder={'Digite sua senha'}
        required
        type={showPassword ? 'text' : 'password'}
      />

      <div className={'mt-4'}>
        <FormButton isSubmitting={isSubmitting} label={'Entrar'} />
      </div>
    </form>
  );
};
