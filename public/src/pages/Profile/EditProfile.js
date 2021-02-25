import { Box, Flex, BorderBox, Dialog, FormGroup, TextInput, Button, ButtonPrimary } from "@primer/components"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import AspectRatio from "../../components/AspectRatio"
import { FeathersContext } from "../../components/feathers"
import DropImage from "../Gigs/DropImage"

const EditProfile = ({ data, onDismiss, onAccept }) => {
  const feathers = useContext(FeathersContext);
  const {
    register, handleSubmit, setValue, watch,
    formState: { errors, isDirty, dirtyFields }
  } = useForm({
    defaultValues: {
      name: data.name,
      profile: data.profile,
      telephone: data.telephone,
      location: data.location,
      avatar: data.avatar
    }
  });

  const media = watch("avatar", { id: null, path: null });

  const send = (d) => {
    let result = {};
    Object.keys(dirtyFields).forEach((key) => {
      result[key] = d[key];
    });
    if (!result) return;

    if (result.avatar) {
      const { avatar } = result;
      if (!avatar.id) result.avatarId = null;
      result.avatarId = result.avatar.id
      delete result.avatar;
    }

    console.log(result);
    feathers.users.patch(data.id, result).then(res => {
      console.log(res);
      onAccept(res);
    })
  }
  return (
    <>
      <Dialog.Header>Edit Profile</Dialog.Header>
      <Box
        as="form"
        p={3}
        overflowY="auto"
        maxHeight="60vh"
        onSubmit={handleSubmit(send)}
      >
        <FormGroup mt={0}>
          <FormGroup.Label>Avatar</FormGroup.Label>
          <input type="hidden" ref={register()} name="avatar.id" />
          <input type="hidden" ref={register()} name="avatar.path" />
          <Box width={`${100 / 3}%`}>
            <BorderBox p={1}>
              <AspectRatio ratio="1:1">
                <DropImage
                  file={{ id: media.id, url: media.path }}
                  onUploaded={(file) => {
                    console.log("upload", file);
                    setValue("avatar", {
                      id: file.id,
                      path: file.path
                    }, { shouldDirty: true });
                  }}
                  onDelete={(file) => {
                    console.log("delete", file);
                    setValue("avatar", {
                      id: null,
                      path: null
                    }, { shouldDirty: true });
                  }}
                ></DropImage>
              </AspectRatio>
            </BorderBox>
          </Box>
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="edit.profile.email">Email</FormGroup.Label>
          <TextInput
            disabled
            defaultValue={data["email"]}
            autoComplete="off"
            aria-label="email"
            name="email"
            id="edit.profile.email"
          />
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="edit.profile.username">Username</FormGroup.Label>
          <TextInput
            disabled
            defaultValue={data["username"]}
            autoComplete="off"
            aria-label="username"
            name="username"
            id="edit.profile.username"
          />
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="edit.profile.name">Nama</FormGroup.Label>
          <TextInput
            ref={register()}
            autoComplete="off"
            aria-label="name"
            name="name"
            id="edit.profile.name"
          />
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="edit.profile.location">Lokasi</FormGroup.Label>
          <TextInput
            ref={register()}
            aria-label="location"
            name="location"
            id="edit.profile.location"
          />
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="edit.profile.telephone">Kontak</FormGroup.Label>
          <TextInput
            ref={register()}
            autoComplete="off"
            aria-label="telephone"
            name="telephone"
            id="edit.profile.telephone"
          />
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="edit.profile.profile">Deskripsi</FormGroup.Label>
          <TextInput
            ref={register()}
            autoComplete="off"
            aria-label="profile"
            name="profile"
            id="edit.profile.profile"
          />
        </FormGroup>
        <Flex mt={3} justifyContent="flex-end">
          <Button mr={2} onClick={() => onDismiss()}>Cancel</Button>
          <ButtonPrimary disabled={!isDirty} type="submit">Simpan</ButtonPrimary>
        </Flex>
      </Box>
    </>
  )
}

export default EditProfile;