import { useContext, useEffect, useMemo, useState } from "react";
import { Box, Flex, Text, ButtonDanger } from "@primer/components"
import { TrashIcon, ImageIcon } from "@primer/styled-octicons";
import { useDropzone } from "react-dropzone";
import _debounce from "lodash.debounce";

import { FeathersContext } from "../../components/feathers";

const DropImage = ({
  sx,
  file = {
    id: null,
    url: null
  },
  disabled,
  onDelete = () => { },
  onUploaded = () => { }
}) => {
  const feathers = useContext(FeathersContext);
  const formData = useMemo(() => new FormData(), []);
  const [loading, setLoading] = useState(false);

  const upload = _debounce((files) => {
    let file = files[0];
    formData.set("uri", file, file.name);
    formData.set("description", "gambar");
    feathers.media.create(formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then((res) => {
      onUploaded(res);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, 1000);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: disabled || (file.id ? true : false),
    onDrop: (files) => {
      setLoading(true);
      upload(files);
    },
    accept: "image/jpeg, image/png, image/gif",
    maxSize: 5e+5,
    multiple: false,
  });


  return (
    <Flex
      {...getRootProps({ refKey: "ref", className: `${disabled ? "disabled" : ""}` })}
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: file.url ? `url(${feathers.host.origin}/${file.url})` : "none",
        cursor: "pointer",
        borderColor: isDragActive ? "blue.5" : "transparent",
        borderWidth: "1px",
        borderStyle: "dashed",
        "&.disabled": {
          cursor: "initial",
        },
        "&:focus-within": {
          boxShadow: "inset 0px 2px 0px rgb(225 228 232 / 20%), rgb(3 102 214 / 30%) 0px 0px 0px 0.2em"
        },
        ...sx
      }}
    >
      <input {...getInputProps()} />
      {loading && <Text textAlign="center">Loading...</Text>}
      {(!loading && !file.url) &&
        <Box color={disabled ? "gray.1" : "gray.5"}>
          <ImageIcon size={24} />
        </Box>}
      {file.url &&
        <Box
          p={1}
          sx={{ position: "absolute", bottom: 0, right: 0 }}
        >
          <ButtonDanger
            variant="small"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!file.id) return;
              const res = await feathers.media.remove(file.id);
              onDelete(res);
            }}
          >
            <TrashIcon size={12} />
          </ButtonDanger>
        </Box>
      }
    </Flex>
  )
}

export default DropImage;