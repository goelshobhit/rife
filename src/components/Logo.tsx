// material
import { useTheme } from '@material-ui/core/styles';
import { Box, BoxProps } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function Logo({ sx }: BoxProps) {
  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg
        width="108"
        height="33"
        viewBox="0 0 108 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1_18502)">
          <path
            d="M0.811768 23.9351V4.37508C0.811768 3.09386 1.86522 2.04041 3.14645 2.04041H11.5456C12.656 2.04041 13.681 2.26818 14.649 2.7522C15.617 3.23622 16.4142 3.83412 17.0976 4.60286C17.7809 5.37159 18.3219 6.22574 18.692 7.19378C19.0621 8.16182 19.2614 9.12985 19.2614 10.1264C19.2614 11.6923 18.8628 13.1159 18.0941 14.4256C17.6955 15.0804 17.2399 15.6214 16.699 16.0769C15.7879 16.8742 15.4747 18.1269 16.1011 19.1804L18.5781 23.5935C19.4892 25.9566 16.3004 29.0316 13.9087 24.7323L10.8907 19.3227C10.4637 18.6394 9.69493 18.2123 8.89773 18.2123H7.90122C6.61999 18.2123 5.56654 19.2658 5.56654 20.547V23.9921C5.56654 25.2733 4.51309 26.3268 3.23186 26.3268H3.20339C1.92216 26.3268 0.868711 25.2733 0.868711 23.9921L0.811768 23.9351ZM5.53807 11.6923C5.53807 12.9735 6.59152 14.027 7.87274 14.027H11.4317C11.8588 14.027 12.2574 13.9131 12.656 13.7138C13.0261 13.5145 13.3678 13.2298 13.624 12.8881C13.9087 12.5465 14.108 12.1194 14.2789 11.6354C14.4497 11.1513 14.5066 10.6389 14.5066 10.0979C14.5066 9.55693 14.4212 9.01597 14.2219 8.53195C14.0511 8.04793 13.7949 7.64933 13.4817 7.27919C13.1685 6.93753 12.8268 6.65282 12.4282 6.45352C12.0296 6.25421 11.631 6.1688 11.2039 6.1688H7.84427C6.56305 6.1688 5.50959 7.22225 5.50959 8.50348V11.6923H5.53807Z"
            fill="#232323"
          />
          <path
            d="M23.532 24.2199V4.65987C23.532 3.37865 24.5855 2.3252 25.8667 2.3252H25.8952C27.1764 2.3252 28.2299 3.37865 28.2299 4.65987V24.2484C28.2299 25.5296 27.1764 26.5831 25.8952 26.5831H25.8667C24.5855 26.5831 23.532 25.5296 23.532 24.2484V24.2199Z"
            fill="#232323"
          />
          <path
            d="M72.4748 24.22V4.66C72.4748 3.37877 73.5282 2.32532 74.8095 2.32532H74.8379C76.1192 2.32532 77.1726 3.37877 77.1726 4.66V24.2485C77.1726 25.5297 76.1192 26.5832 74.8379 26.5832H74.8095C73.5282 26.5832 72.4748 25.5297 72.4748 24.2485V24.22Z"
            fill="#232323"
          />
          <path
            d="M101.972 24.2199V12.8313C101.972 12.2334 101.175 12.0341 100.89 12.575L96.7901 20.8888C95.2811 22.8533 93.6582 22.5116 92.4624 20.9742L87.9638 12.5466C87.6791 12.0056 86.8819 12.2049 86.8819 12.8028V24.1915C86.8819 25.4727 85.8285 26.5262 84.5472 26.5262H84.5188C83.2375 26.5262 82.1841 25.4727 82.1841 24.1915V4.6599C82.1841 3.37868 83.2375 2.32522 84.5188 2.32522H85.8C86.6826 2.32522 87.4798 2.80924 87.8784 3.57798L92.6617 12.2334C94.4838 15.7639 95.2241 15.593 96.8185 12.2334L100.975 3.54951C101.374 2.78077 102.171 2.29675 103.054 2.29675H104.335C105.616 2.29675 106.67 3.35021 106.67 4.63143V24.2199C106.67 25.5012 105.616 26.5546 104.335 26.5546H104.307C103.025 26.5546 101.972 25.5012 101.972 24.2199Z"
            fill="#232323"
          />
          <path
            d="M66.3535 21.6006C66.3535 19.7784 65.2716 18.5826 64.5598 17.7854C64.3605 17.5576 64.1042 17.3014 63.9903 17.1021C64.0757 17.0451 64.1896 16.9597 64.275 16.9028C65.2431 16.2194 67.2646 14.8243 66.6951 11.7209C66.4104 10.1265 65.2431 7.42169 60.773 7.42169C60.773 7.42169 57.3849 7.5071 57.271 7.5071H56.9293C56.4169 6.08352 55.7051 4.83076 54.7086 3.74884C53.7121 2.66691 52.4593 1.78429 50.9788 1.15792C49.4982 0.531538 47.7615 0.189878 45.7685 0.189878H43.747C43.747 0.189878 43.3768 0.132935 43.206 0.132935H40.0456C35.5756 0.132935 34.4367 2.80927 34.1235 4.40369C33.5541 7.5071 35.5756 8.90221 36.5436 9.58553C36.629 9.64248 36.7429 9.69942 36.8283 9.78483C36.7145 9.98414 36.4582 10.2404 36.2589 10.4682C35.5471 11.2654 34.4652 12.4327 34.4652 14.2834C34.4652 16.134 35.6041 17.1875 36.4867 17.9277C35.4902 19.209 34.4652 20.9457 35.2339 22.6256C35.8318 23.9637 37.1985 24.6471 39.5047 24.6755L43.6046 24.4478C43.6046 24.4478 43.69 24.4193 43.747 24.4193H44.7719C44.7719 24.4193 44.7719 24.5616 44.8004 24.5901C45.3698 26.0706 46.1671 27.3519 47.2205 28.4053C48.274 29.4588 49.5267 30.2844 51.0072 30.8539C52.4878 31.4233 54.1107 31.7365 55.9328 31.7365H57.7835L61.5133 31.9643C63.6487 31.9358 65.0438 31.224 65.6417 29.8858C66.382 28.206 65.3854 26.4692 64.3889 25.188C65.2716 24.4478 66.4104 23.3089 66.4104 21.5436L66.3535 21.6006ZM43.3199 20.177L40.1026 20.3763C40.2449 20.2055 40.4158 20.0062 40.6151 19.7784C41.1845 19.152 41.4408 18.3833 41.3838 17.6145C41.2699 16.2764 40.2734 15.4792 39.5332 14.8813C39.2769 14.682 38.7644 14.3403 38.7644 14.3403C38.7644 14.1695 39.1346 13.7709 39.4193 13.4577C40.1311 12.6605 41.213 11.4931 41.213 9.64248C41.213 7.64946 39.7609 6.62448 38.9637 6.08352C38.7359 5.94116 38.3943 5.68491 38.3089 5.57103C38.3089 5.57103 38.138 5.42867 38.1665 5.22937C38.2235 4.85923 38.4512 4.51757 39.9602 4.51757C39.9602 4.51757 42.6366 4.40369 43.8893 4.37522H45.7115C46.8504 4.37522 47.8754 4.57452 48.758 4.94465C49.6691 5.34325 50.4093 5.88421 51.0357 6.59601C51.4058 7.05155 51.719 7.56404 52.0037 8.10501C51.5482 8.21889 51.0642 8.33278 50.6656 8.50361C49.1851 9.12999 47.9323 10.0126 46.9358 11.0945C45.9393 12.1765 45.1705 13.4577 44.6865 14.9382C44.2025 16.4187 43.9463 17.9847 43.9463 19.636C43.9463 19.8638 43.9747 20.0631 44.0032 20.2624C43.7754 20.2055 43.5477 20.1485 43.3484 20.177H43.3199ZM61.3425 20.718C61.6272 21.0311 61.9973 21.4298 62.0543 21.4298C61.9688 21.6006 61.5133 21.9422 61.257 22.17C60.5168 22.7679 59.5203 23.5651 59.4064 24.9033C59.3494 25.672 59.6057 26.4408 60.1751 27.0671C60.3744 27.2949 60.5453 27.4657 60.6876 27.6366H55.9044C54.737 27.6651 53.7121 27.4657 52.801 27.0671C51.8899 26.6685 51.1496 26.0991 50.5517 25.3873C50.1816 24.9602 49.8968 24.4762 49.6406 23.9353C49.9823 23.8214 50.3524 23.7644 50.6656 23.6505C52.1461 23.0811 53.3989 22.2554 54.4523 21.202C55.5058 20.1485 56.303 18.8673 56.8724 17.3868C57.4418 15.9062 57.6981 14.2264 57.6981 12.3758C57.6981 12.2049 57.6696 12.0341 57.6696 11.8348H60.8015C62.3105 11.8348 62.6522 12.1765 62.7091 12.5466C62.7376 12.7459 62.4813 12.8598 62.4813 12.8598C62.3105 13.0021 62.0543 13.2299 61.8265 13.3723C61.0293 13.9132 59.5772 14.9097 59.5772 16.9312C59.5772 18.7534 60.6591 19.9492 61.3709 20.7464L61.3425 20.718Z"
            fill="#232323"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_18502">
            <rect
              width="105.886"
              height="31.8313"
              fill="white"
              transform="translate(0.811768 0.161377)"
            />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
}
